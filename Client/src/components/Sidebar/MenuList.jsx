import { Menu } from "antd";
import { useState } from "react";
import {
  HomeOutlined,
  SettingOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { MdTaskAlt, MdOutlinePendingActions } from "react-icons/md";

const MenuList = () => {
  const [selectedKeys, setSelectedKeys] = useState(["dashboard"]);

  const handleMenuSelect = (e) => {
    setSelectedKeys([e.key]);
  };

  return (
    <Menu
      theme="dark"
      className="menu-bar"
      selectedKeys={selectedKeys}
      onSelect={handleMenuSelect}
    >
      <Menu.Item key="dashboard" icon={<HomeOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="tasks" icon={<FaTasks />}>
        <Link to="/taskdetails">Tasks</Link>
      </Menu.Item>
      <Menu.Item key="complete" icon={<MdTaskAlt />}>
        Completed
      </Menu.Item>
      <Menu.Item key="inprogress" icon={<AreaChartOutlined />}>
        In Progress
      </Menu.Item>
      <Menu.Item key="pending" icon={<MdOutlinePendingActions />}>
        To Do
      </Menu.Item>
      <Menu.Item key="user" icon={<FaUsers />}>
        Team
      </Menu.Item>
      <Menu.Item key="trashed" icon={<FaTrashAlt />}>
        Trash
      </Menu.Item>
      <Menu.Item key="setting" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
