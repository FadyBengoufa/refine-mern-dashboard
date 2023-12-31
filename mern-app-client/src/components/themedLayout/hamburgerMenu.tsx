import React from "react";
import { useThemedLayoutContext } from "@refinedev/mui";
import Menu from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import type { ExtendButtonBase } from "@mui/material/ButtonBase";
import type { IconButtonTypeMap } from "@mui/material/IconButton";

const HamburgerIcon: ExtendButtonBase<IconButtonTypeMap<{}, "button">> = (
  props: React.PropsWithChildren
) => (
  <IconButton color="inherit" aria-label="open drawer" edge="start" {...props}>
    <Menu />
  </IconButton>
);

export const HamburgerMenu: React.FC = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <>
      <HamburgerIcon
        onClick={() => setSiderCollapsed(!siderCollapsed)}
        sx={{
          mr: 1,
          display: { xs: "none", md: "flex" },
          ...(!siderCollapsed && { display: "none" }),
          color:"#000"
        }}
      />
      <HamburgerIcon
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
        sx={{
          mr: 1,
          display: { xs: "flex", md: "none" },
          ...(mobileSiderOpen && { display: "none" }),
          color:"#000"
        }}
      />
    </>
  );
};
