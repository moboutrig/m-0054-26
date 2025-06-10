
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

      <div className="cms-container container py-3 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-4 sm:mb-6">
              <CMSTabsConfig />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <CMSTabContent />
            </div>
          </Tabs>

          <div className="mt-6 sm:mt-8">
            <CMSInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
