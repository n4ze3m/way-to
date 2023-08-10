import { Form, Modal, Select, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { UrlInput } from "~/components/Common/UrlInput";
import { api } from "~/utils/api";

export default function DashboardNotFoundBody() {
  const router = useRouter();

  const [openModal, setOpenModal] = React.useState(false);
  const [collections, setCollections] = React.useState<
    { id: string; name: string }[]
  >([]);
  const [form] = Form.useForm();

  const { path } = router.query;

  const { status: collectionsStatus, data: coll } =
    api.collection.getCollection.useQuery();

  const [createCollectionForm] = Form.useForm();

  React.useEffect(() => {
    if (collectionsStatus === "error") {
      router.push("/auth");
    } else if (collectionsStatus === "success") {
      setCollections(coll.map((c) => ({ id: c.id, name: c.name })));
    }
  }, [collectionsStatus]);

  React.useEffect(() => {
    if (path) {
      form.setFieldsValue({
        to_path: path,
      });
    }
  }, [path]);

  const { mutate: createCollectionMutation, isLoading: isCreatingCollection } =
    api.collection.createCollection.useMutation({
      onSuccess: (data) => {
        setCollections((prev) => [
          ...prev,
          {
            id: data,
            name: createCollectionForm.getFieldValue("name"),
          },
        ]);
        form.setFieldsValue({
          collection_id: data,
        });
        setOpenModal(false);
      },

      onError: (err) => {
        notification.error({
          message: err.message,
        });
      },
    });

  const { mutate: addLinkMutation, isLoading: isAddingLink } =
    api.link.createLink.useMutation({
      onSuccess: (data) => {
        notification.success({
          message: "Success",
          description: "Link Added Successfully",
        });
      },
      onError: (err) => {
        notification.error({
          message: err.message,
        });
      },
    });

  return (
    <div className="flex flex-col items-center justify-center py-3 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          No Paths Found for{" "}
          <span className="bg-white-500 text-indigo-600">{`to/${path}`}</span>
        </div>
      </div>

      <div className="mt-10 w-full max-w-md space-y-3">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-lg font-medium text-gray-900">
              Add a Website to this Path
            </span>
          </div>
        </div>

        <div>
          <Form
            form={form}
            layout="vertical"
            onFinish={addLinkMutation}
            initialValues={{
              to_path: path,
            }}
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

            <Form.Item
              name="collection_id"
              label="Collection"
              rules={[
                { required: true, message: "Please select a collection!" },
              ]}
            >
              <Select
                onChange={(value) => {
                  if (value === "new") {
                    setOpenModal(true);
                  }
                }}
                placeholder="Select a collection"
                disabled={collectionsStatus === "loading"}
                loading={collectionsStatus === "loading"}
              >
                {collections.map((collection) => (
                  <Select.Option value={collection.id}>
                    {collection.name}
                  </Select.Option>
                ))}
                <Select.Option value="new">+ New Collection</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <button
                disabled={isAddingLink}
                type="submit"
                className="relative w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isAddingLink ? "Adding Link..." : "Add Link"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Modal
        open={openModal}
        footer={null}
        title="Create Collection"
        onCancel={() => {
          form.setFieldsValue({
            collection_id: undefined,
          });
          setOpenModal(false);
        }}
        onOk={() => {
          form.setFieldsValue({
            collection_id: undefined,
          });
          setOpenModal(false);
        }}
      >
        <Form
          onFinish={createCollectionMutation}
          form={createCollectionForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Collection Name"
            rules={[
              { required: true, message: "Please input a collection name!" },
            ]}
          >
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-2 py-1  focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Collection Name"
            />
          </Form.Item>

          <Form.Item>
            <button
              disabled={isCreatingCollection}
              className="relative w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              {isCreatingCollection ? "Creating..." : "Create"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
