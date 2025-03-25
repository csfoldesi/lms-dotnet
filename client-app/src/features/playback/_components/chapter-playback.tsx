import { Banner } from "@/components/banner";
import { useGetChapter } from "@/features/courses/chapters/api/use-get-chapter";
import { useChapterId } from "@/hooks/use-chapter-id";
import { useCourseId } from "@/hooks/use-course-id";
import { VideoPlayer } from "./video-player";
import { CourseEnrollButton } from "./course-enroll-button";
import { Separator } from "@radix-ui/react-separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { ChapterProgressButton } from "./chapter-progress-button";
import { useGetCourse } from "../api/use-get-course";

export const ChapterPlayback = () => {
  const courseId = useCourseId();
  const chapterId = useChapterId();
  const { data: course, isLoading: isLoadingCourse } = useGetCourse(courseId);
  const { data: chapter, isLoading: isLoadingChapter } = useGetChapter(chapterId);

  const isLocked = !chapter?.isFree && !course?.isPurchased;
  const completeOnEnd = !!(course?.isPurchased && !chapter?.isCompleted);

  if (!course || !chapter) return null;

  return (
    <div>
      {isLocked && <Banner label="You need to purchase this chapter to continue" variant="warning" />}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={chapter.nextChapterId}
            url={chapter.videoUrl}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {course.isPurchased ? (
            <ChapterProgressButton
              chapterId={chapterId}
              courseId={courseId}
              nextChapterId={chapter.nextChapterId}
              isCompleted={chapter.isCompleted}
            />
          ) : (
            <CourseEnrollButton courseId={courseId} price={course.price!} />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!course.attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {course.attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center p-3 bg-sky-200 border text-sky-700 rounded-md hover:underline">
                  <File />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
