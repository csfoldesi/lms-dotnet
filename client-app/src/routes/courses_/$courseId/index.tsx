import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses_/$courseId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses_/$courseId/"!</div>
}
