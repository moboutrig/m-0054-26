
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import CMSHeader from "@/components/cms/CMSHeader";
import CMSTabsConfig from "@/components/cms/CMSTabsConfig";
import CMSTabContent from "@/components/cms/CMSTabContent";
import CMSInfoCard from "@/components/cms/CMSInfoCard";

export default function CMS() {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="min-h-screen bg-background">
      <CMSHeader />

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CMSTabsConfig />
          <CMSTabContent />
        </Tabs>

        <CMSInfoCard />
      </div>
    </div>
  );
}
