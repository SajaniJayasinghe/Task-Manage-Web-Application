import { Menu } from "antd";
import { useState } from "react";
import {
  HomeOutlined,
  SettingOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { MdTaskAlt, MdOutlinePendingActions } from "react-icons/md";

const MenuList = () => {
  const [selectedKeys, setSelectedKeys] = useState(["dashboard"]);
  const navigate = useNavigate();

  const handleMenuSelect = (e) => {
    setSelectedKeys([e.key]);
    navigate(e.key);
  };

  return (
    <Menu
      theme="dark"
      className="menu-bar"
      selectedKeys={selectedKeys}
      onClick={handleMenuSelect}
    >
      <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="/taskdetails" icon={<FaTasks />}>
        Tasks
      </Menu.Item>
      <Menu.Item key="/completedtasks" icon={<MdTaskAlt />}>
        Completed
      </Menu.Item>
      <Menu.Item key="/inprogress" icon={<AreaChartOutlined />}>
        In Progress
      </Menu.Item>
      <Menu.Item key="/pending" icon={<MdOutlinePendingActions />}>
        To Do
      </Menu.Item>
      <Menu.Item key="/team" icon={<FaUsers />}>
        Team
      </Menu.Item>
      <Menu.Item key="/trashed" icon={<FaTrashAlt />}>
        Trash
      </Menu.Item>
      <Menu.Item key="/setting" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
