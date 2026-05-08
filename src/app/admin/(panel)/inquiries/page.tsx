import { Box } from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function AdminInquiriesPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Communication"
        title="Inquiries"
        subtitle="Messages submitted via the public contact form."
      />
      <ComingSoon
        icon={<MarkEmailUnreadIcon fontSize="large" />}
        title="Inquiry inbox"
        description="Once the contact form persists submissions to Firestore, every new message will land here for you to read and respond to."
        ideas={[
          "Threaded inbox grouped by status (new / replied / archived)",
          "Filter by category — quote request, general, partnership",
          "Reply via a templated email (Gmail / SendGrid integration)",
          "Optional Slack / email alerts on every new submission",
        ]}
      />
    </Box>
  );
}
