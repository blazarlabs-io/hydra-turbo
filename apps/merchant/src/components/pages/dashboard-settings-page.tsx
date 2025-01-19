"use client";

import { Separator } from "@repo/ui/components/ui/separator";
import { PageHeader } from "../layouts/page-header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useTheme } from "next-themes";

export const DashboardSettingsPage = () => {
  const { setTheme, theme } = useTheme();

  const handleTheme = (t: string) => {
    setTheme(t);
  };
  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Settings" subtitle="Manage your app settings" />
      <Separator className="w-full" />
      <div className="flex gap-1 items-center justify-between border rounded-md p-6">
        <div>
          <h2 className="text-base font-bold">Theme</h2>
          <p className="text-sm">Change the theme of the app</p>
        </div>
        <div>
          <Select value={theme} onValueChange={handleTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Themes</SelectLabel>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
