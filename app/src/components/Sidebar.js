import React from "react";
import "./sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h3 className="color">Solana Twitter</h3>
            <TwitterIcon className="sidebar__twitterIcon" />
            <SidebarOption Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Topics" />
            {/* <SidebarOption Icon={NotificationsNoneIcon} text="User" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" /> */}
            <SidebarOption Icon={ListAltIcon} text="Users" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />
            {/* <SidebarOption Icon={MoreHorizIcon} text="More" /> */}

            {/* Button -> Tweet */}
            <Button variant="outlined" className="sidebar__tweet" fullWidth>
                Tweet
            </Button>
        </div>
    )
}

export default Sidebar