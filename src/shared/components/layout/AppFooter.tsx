export function AppFooter() {
  return (
    <footer className="border-t bg-background px-6 py-4">

      <p className="text-center text-sm text-muted-foreground">

        © {new Date().getFullYear()} LMS Platform.
        All rights reserved.

      </p>

    </footer>
  );
}