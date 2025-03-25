import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCreateCheckoutSession } from "../api/use-create-checkout-session";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY!);

export const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createCheckoutSession } = useCreateCheckoutSession();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      const session = await createCheckoutSession({ courseId });

      if (!stripe || !session) return;

      const result = await stripe.redirectToCheckout({
        sessionId: session,
      });

      if (result.error) {
        toast.error(result.error.message!);
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }

    /*try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }*/
  };

  return (
    <Button onClick={onClick} disabled={isLoading} className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
