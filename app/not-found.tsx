import EmptyState from "@/app/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState 
      title="404"
      subtitle="Page not found"
      showReset
    />
  );
} 