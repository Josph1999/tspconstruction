import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function AdminSettingsPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Configuration"
        title="Site settings"
        subtitle="Global content shown across the public site."
      />
      <ComingSoon
        icon={<SettingsIcon fontSize="large" />}
        title="Site-wide content & config"
        description="Edit the content blocks that aren't tied to a specific page — hero copy, contact info, social links, and the homepage stat counters."
        ideas={[
          "Hero headline, subtitle, and trust badge (per locale)",
          "Stats numbers (250+ projects, 20+ years, etc.)",
          "Contact details (address, phone, email)",
          "Social media links and footer tagline",
          "About section copy",
        ]}
      />
    </Box>
  );
}
