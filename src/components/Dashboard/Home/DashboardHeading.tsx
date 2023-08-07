import { Modal, Form, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

export default function DashboardHeading() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { mutate: createCollection, isLoading: isCreatingCollection } =
    api.collection.createCollection.useMutation({
      onSuccess: (id) => {
        form.resetFields();
        router.push(`/dashboard/collection/${id}`);
        notification.success({
          message: "Collection Created",
        });
      },
      onError: (error) => {
        console.error(error);
        notification.error({
          message: "Error Creating Collection",
        });
      },
    });
  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Collections
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            {/* btn style copied from dub.sh */}
            <button
              onClick={() => setIsModalVisible(true)}
              type="button"
              className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
            >
              New Collection
            </button>
          </span>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
        title="Create New Collection"
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={createCollection}>
          <Form.Item
            name="name"
            label="Collection Name"
            rules={[
              { required: true, message: "Please input your collection name!" },
            ]}
          >
            <input
              className="w-full rounded-md border border-gray-300 px-2 py-1  focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Collection Name"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Collection Description"
          >
            <textarea
              className="w-full rounded-md border border-gray-300 px-2 py-1  focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Collection Description"
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              disabled={isCreatingCollection}
              className="w-full rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
            >
              {isCreatingCollection
                ? "Creating Collection..."
                : "Create Collection"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
