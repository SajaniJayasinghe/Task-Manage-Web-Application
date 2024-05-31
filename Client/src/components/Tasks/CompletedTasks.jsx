import React, { useState } from "react";
import { Layout, Card, Row, Col, Button, Table, Pagination } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";

const { Sider, Content } = Layout;

// Define TASK_TYPE object
const TASK_TYPE = {
  todo: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const CompletedTasks = () => {
  // Sample completed tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Completed Task 1",
      description: "Description for completed task 1",
      status: "completed",
      createdate: "2024-05-01",
      duedate: "2024-05-10",
    },
    {
      id: 2,
      title: "Completed Task 2",
      description: "Description for completed task 2",
      status: "completed",
      createdate: "2024-05-02",
      duedate: "2024-05-11",
    },
    {
      id: 3,
      title: "Completed Task 3",
      description: "Description for completed task 3",
      status: "completed",
      createdate: "2024-05-03",
      duedate: "2024-05-12",
    },
    {
      id: 4,
      title: "Completed Task 4",
      description: "Description for completed task 4",
      status: "completed",
      createdate: "2024-05-03",
      duedate: "2024-05-12",
    },
  ]);

  const [view, setView] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of cards to show per page

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created Date",
      dataIndex: "createdate",
      key: "createdate",
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
    },
  ];

  const paginationOptions = {
    pageSize: pageSize,
    total: tasks.length,
    onChange: handleChangePage,
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              Completed Tasks
            </h1>
            <div>
              <Button
                icon={<AppstoreOutlined />}
                onClick={() => setView("card")}
                style={{ marginRight: "8px" }}
              >
                Card View
              </Button>
              <Button
                icon={<UnorderedListOutlined />}
                onClick={() => setView("list")}
              >
                List View
              </Button>
            </div>
          </div>
          {view === "card" ? (
            <>
              <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {paginatedTasks.map((task) => (
                  <Col span={8} key={task.id}>
                    <Card
                      title={task.title}
                      bordered={true}
                      style={{ borderColor: "black" }}
                    >
                      <p>{task.description}</p>
                      <p>Status: {task.status}</p>
                      <p>Created Date: {task.createdate}</p>
                      <p>Due Date: {task.duedate}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Pagination {...paginationOptions} />
              </div>
            </>
          ) : (
            <>
              <Table
                style={{ marginTop: "20px" }}
                dataSource={paginatedTasks}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Pagination {...paginationOptions} />
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CompletedTasks;
