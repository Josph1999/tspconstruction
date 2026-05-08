"use client";

import { useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SettingsIcon from "@mui/icons-material/Settings";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import BrandMark from "@/components/landing/BrandMark";
import { useAuth } from "@/lib/firebase/auth-context";

const SIDEBAR_W = 264;

type NavItem = {
  label: string;
  href: string;
  icon: typeof DashboardIcon;
  soon?: boolean;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
  { label: "Projects", href: "/admin/projects", icon: WorkIcon },
  { label: "Services", href: "/admin/services", icon: HomeWorkIcon, soon: true },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: MarkEmailUnreadIcon,
    soon: true,
  },
  {
    label: "Site settings",
    href: "/admin/settings",
    icon: SettingsIcon,
    soon: true,
  },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = <SidebarInner onNavigate={() => setMobileOpen(false)} />;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <Box
        component="nav"
        sx={{
          width: { md: SIDEBAR_W },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: SIDEBAR_W,
              background: "#0B1220",
              border: "none",
            },
          }}
        >
          {sidebar}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: SIDEBAR_W,
              background: "#0B1220",
              border: "none",
            },
          }}
          open
        >
          {sidebar}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar onOpenMenu={() => setMobileOpen(true)} />
        <Box sx={{ p: { xs: 2.5, md: 4 }, flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}

function SidebarInner({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname() ?? "";
  return (
    <Stack sx={{ height: "100%", color: "#fff" }}>
      <Toolbar sx={{ px: 3, mt: 1 }}>
        <BrandMark dark />
      </Toolbar>
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 700,
            px: 1,
            mb: 1,
          }}
        >
          Manage
        </Typography>
        <List disablePadding>
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={onNavigate}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 1.1,
                  color: active ? "#0B1220" : "rgba(255,255,255,0.78)",
                  background: active
                    ? "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)"
                    : "transparent",
                  "&:hover": {
                    background: active
                      ? "linear-gradient(135deg, #D97706 0%, #EA580C 100%)"
                      : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? "#0B1220" : "rgba(255,255,255,0.6)",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: { fontSize: "0.95rem", fontWeight: active ? 700 : 500 },
                    },
                  }}
                />
                {item.soon && (
                  <Box
                    sx={{
                      px: 0.8,
                      py: 0.2,
                      borderRadius: 999,
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      background: active
                        ? "rgba(11,18,32,0.18)"
                        : "rgba(252,211,77,0.16)",
                      color: active ? "#0B1220" : "#FCD34D",
                    }}
                  >
                    soon
                  </Box>
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ p: 2 }}>
        <ListItemButton
          component="a"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: 2,
            color: "rgba(255,255,255,0.7)",
            "&:hover": { background: "rgba(255,255,255,0.05)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View public site" />
        </ListItemButton>
      </Box>
    </Stack>
  );
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleSignOut = async () => {
    setAnchor(null);
    await signOut();
    router.replace("/admin");
  };

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "AD";

  return (
    <Box
      component="header"
      sx={{
        height: 72,
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: { xs: 2, md: 3.5 },
        background: "#fff",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <IconButton
        onClick={onOpenMenu}
        sx={{ display: { md: "none" } }}
        aria-label="Open menu"
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ flex: 1 }} />

      <Tooltip title="View public site">
        <IconButton
          component="a"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "text.secondary" }}
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Box
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 1,
          py: 0.5,
          borderRadius: 999,
          cursor: "pointer",
          transition: "background 200ms ease",
          "&:hover": { background: "rgba(15,23,42,0.05)" },
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
            color: "#0B1220",
            fontSize: "0.85rem",
            fontWeight: 700,
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" }, lineHeight: 1.2 }}>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {user?.displayName || "Admin"}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 200, borderRadius: 2 } } }}
      >
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {user?.email}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
            Signed in
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}
