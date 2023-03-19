import React from "react";
import { Drawer, Box } from "@mui/material";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

function RightDrawer({ children, openState, close, variant }) {
  return (
    <Drawer
      anchor="right"
      variant="temporary"
      onClose={(_, reason) =>
        reason === "backdropClick" && variant === "persistent" ? null : close()
      }
      open={openState}
    >
      <Box role="presentation">
        <div
          className="border m-2 rounded-full w-fit p-2 cursor-pointer"
          onClick={close}
        >
          <AiOutlineClose size="15px" />
        </div>
        <div className="px-5 mt-8 mb-5 !box-border">{children}</div>
      </Box>
    </Drawer>
  );
}

RightDrawer.defaultProps = {
  variant: "temporary",
};

RightDrawer.propTypes = {
  openState: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  variant: PropTypes.string,
};

export default RightDrawer;
