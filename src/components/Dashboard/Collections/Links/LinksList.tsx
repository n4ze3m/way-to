import { useRouter } from "next/router";
import React from "react";
import BreadCrumbs from "~/components/Common/BreadCrumbs";
import { Loading } from "~/components/Common/Loading";
import { api } from "~/utils/api";
import { LinksCard } from "./LinksCard";
import { Form, Modal, notification } from "antd";
import { UrlInput } from "~/components/Common/UrlInput";

export const LinkList = () => {
  const router = useRouter();

  const { slug } = router.query as {
    slug: string;
  };
  const { status, data } = api.collection.getCollectionById.useQuery({
    id: slug,
  });

  React.useEffect(() => {
    if (status === "error") {
      router.push("/404");
    }
  }, [status, data]);

  const [open, setOpen] = React.useState(false);

  const [editData, setEditData] = React.useState({});

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(editData);
  }, [editData]);

  const client = api.useContext();

  const { mutate: updateLink, isLoading: isUpdatingLink } =
    api.link.editLink.useMutation({
      onSuccess: () => {
        client.collection.getCollectionById.invalidate({ id: slug });
        setOpen(false);
        notification.success({
          message: "Link Updated Successfully",
        });
      },
      onError: () => {
        notification.error({
          message: "Error Updating Link",
        });
      },
    });

  const { mutate: deleteLink } = api.link.deleteLink.useMutation({
    onSuccess: () => {
      client.collection.getCollectionById.invalidate({ id: slug });
      notification.success({
        message: "Link Deleted Successfully",
      });
    },
    onError: () => {
      notification.error({
        message: "Error Deleting Link",
      });
    },
  });

  return (
    <div className="mt-6">
      {status === "loading" && (
        <div>
          <Loading gridCount={2} />
        </div>
      )}
      {status === "success" && (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.url.map((item) => (
              <LinksCard
                key={item.id}
                {...item}
                onEditClick={() => {
                  setEditData(item);
                  setOpen(true);
                }}
                onDeleteClick={() => {
                  const isOk = confirm("Are you sure you want to delete?");
                  if (isOk) {
                    deleteLink({
                      id: item.id,
                      collection_id: item.collection_id,
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      <Modal
        title="Edit Link"
        onCancel={() => setOpen(false)}
        open={open}
        footer={null}
        onOk={() => setOpen(false)}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editData}
          onFinish={(values) => {
            updateLink({
              ...editData,
              ...values,
            });
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

          <Form.Item>
            <button
              type="submit"
              disabled={isUpdatingLink}
              className="relative w-full  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isUpdatingLink ? "Updating link..." : "Update link"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
