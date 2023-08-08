import { Modal, Form, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { UrlInput } from "~/components/Common/UrlInput";
import { api } from "~/utils/api";

export default function LinkHeading() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const { slug } = router.query as {
    slug: string;
  };

  const client = api.useContext();

  const { mutate: createLink, isLoading: isCreatingLink } =
    api.link.createLink.useMutation({
      onSuccess: (id) => {
        client.collection.getCollectionById.invalidate();
        setIsModalVisible(false);
        form.resetFields();
        notification.success({
          message: "Link added to collection",
        });
      },
      onError: (error) => {
        console.error(error);
        notification.error({
          message: "Error adding link to collection",
        });
      },
    });
  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Links
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <button
              onClick={() => setIsModalVisible(true)}
              type="button"
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to link
            </button>
          </span>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
        title="Add a new link"
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(value) =>
            createLink({
              ...value,
              collection_id: slug,
            })
          }
        >
          <Form.Item
            name="url"
            label="Destination URL"
            rules={[{ required: true, message: "Please input a URL!" }]}
          >
            <input
              type="url"
              className="w-full rounded-md border border-gray-300 px-2 py-1  focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter URL"
            />
          </Form.Item>

          <Form.Item
            name="to_path"
            label="Path Name"
            rules={[{ required: true, message: "Please input a path name!" }]}
          >
            <UrlInput placeholder="Enter Collection Name" />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              disabled={isCreatingLink}
              className="relative w-full  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isCreatingLink ? "Adding link..." : "Add link"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
