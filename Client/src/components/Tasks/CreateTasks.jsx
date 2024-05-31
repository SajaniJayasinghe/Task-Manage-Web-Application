import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const { Option } = Select;

const CreateTaskForm = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission logic here
      console.log("Form values:", values);
      form.resetFields(); // Reset form fields after submission
      setOpen(false); // Close the modal after submission
    });
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields when the modal is closed
    setOpen(false); // Close the modal
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold" }}>ADD TASK</span>}
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit" // Rename OK button to Submit
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="createTaskForm"
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
            name="tody"
            label={<span style={{ fontSize: "16px" }}>Assign Date :</span>}
            initialValue={today}
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
              {/* Options for users */}
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

export default CreateTaskForm;
