import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create-post"!</div>
}
