import { useAuth } from "@/features/auth/hooks";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

export function WelcomeWidget() {
  const { currentUser } = useAuth();

  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <h1 className="text-3xl font-bold">
          Selamat Datang
        </h1>

        <p className="text-muted-foreground">
          Halo,{" "}
          <span className="font-semibold">
            {currentUser?.fullName ?? "Pengguna"}
          </span>
          .
        </p>
      </CardContent>
    </Card>
  );
}

export default WelcomeWidget;