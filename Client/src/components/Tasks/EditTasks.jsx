import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const EditTaskForm = ({ open, setOpen, task, handleEditTask }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        user: task.user,
        status: task.status,
      });
    }
  }, [task, form]);

  // useEffect(() => {
  //   // Fetch all users when component mounts
  //   getAllUsers();
  // }, []);

  // Function to fetch all users
  // const getAllUsers = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/v1/user/getallusers"
  //     );
  //     setUsers(response.data); // Set the users state with fetched data
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedTask = {
        ...task,
        ...values,
      };
      await axios.put(
        `http://localhost:8080/api/v1/task/updateTask/${task._id}`,
        updatedTask
      );
      handleEditTask(updatedTask);
      form.resetFields(); // Reset form fields after submission
      setOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error case here
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields when the modal is closed
    setOpen(false); // Close the modal
  };

  return (
    <Modal
      title={
        <span style={{ fontWeight: "bold", fontSize: "25px" }}>EDIT TASK</span>
      }
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="editTaskForm"
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="title"
          label={<span style={{ fontSize: "16px" }}>Task Title :</span>}
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item name="description" label="Description :">
          <Input.TextArea placeholder="Enter task description" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="assignDate"
            label={<span style={{ fontSize: "16px" }}>Assign Date :</span>}
            initialValue={task ? task.assignDate : ""}
            style={{ flex: 1, marginRight: 8 }}
          >
            <Input type="date" disabled />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label={<span style={{ fontSize: "16px" }}> Due Date :</span>}
            rules={[{ required: true, message: "Date is required!" }]}
            style={{ flex: 1, marginLeft: 8 }}
          >
            <Input type="date" />
          </Form.Item>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="user"
            label={<span style={{ fontSize: "16px" }}>Assign to :</span>}
            rules={[{ required: true, message: "Please select a user!" }]}
            style={{ flex: 1, marginRight: 8 }}
          >
            <Select placeholder="Select a user">
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label={<span style={{ fontSize: "16px" }}>Task Stage :</span>}
            initialValue="To Do"
            style={{ flex: 1, marginLeft: 8 }}
          >
            <Select placeholder="Select a Status">
              <Option value="pending">To Do</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditTaskForm;
