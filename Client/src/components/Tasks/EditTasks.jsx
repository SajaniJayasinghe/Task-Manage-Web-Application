import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Option } = Select;

const EditTaskForm = ({ open, setOpen, task, handleEditTask }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [status, setStatus] = useState([]);
  const [dueDate, setDueDate] = useState([]);

  const params = useParams();
  const taskId = params.taskId;

  useEffect(() => {
    getAllUsers();
  }, []);

  // Function to fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getallusers"
      );
      let users = response.data.users.map((user) => ({
        label: user.username,
        value: user._id,
      }));
      setUsers(users); // Set the users state with fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
      message.success("Task updated successfully");
      form.resetFields(); // Reset form fields after submission
      setOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Failed to update task");
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
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="user"
            label={<span style={{ fontSize: "16px" }}>Assign to :</span>}
            rules={[{ required: true, message: "Please select a user!" }]}
            style={{ flex: 1, marginRight: 8 }}
          >
            <Select options={users}></Select>
          </Form.Item>
          <Form.Item
            name="status"
            label={<span style={{ fontSize: "16px" }}>Task Stage :</span>}
            initialValue="Pending"
            style={{ flex: 1, marginLeft: 8 }}
          >
            <Select placeholder="Select a Status">
              <Option value="Pending">To Do</Option>
              <Option value="Inprogress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditTaskForm;
