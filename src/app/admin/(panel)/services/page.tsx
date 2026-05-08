import { Box } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function AdminServicesPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Content"
        title="Services"
        subtitle="Manage the six service cards on the homepage."
      />
      <ComingSoon
        icon={<HomeWorkIcon fontSize="large" />}
        title="Service cards manager"
        description="Edit the cards shown on the homepage Services section — title, description, icon, and display order."
        ideas={[
          "Per-locale title and description (English + Georgian)",
          "Choose icon from a curated set (or upload SVG)",
          "Drag-to-reorder cards",
          "Show / hide individual services without deleting",
        ]}
      />
    </Box>
  );
}
