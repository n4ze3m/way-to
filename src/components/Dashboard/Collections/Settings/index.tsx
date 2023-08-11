import { Form, Skeleton, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

export default function SettingsBody() {
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

  const client = api.useContext();

  const { mutate: updateCollection, isLoading: isUpdating } =
    api.collection.updateCollection.useMutation({
      onSuccess: (data) => {
        client.collection.getCollectionById.invalidate({ id: slug });
        notification.success({
          message: data,
        });
      },
      onError: (error) => {
        notification.error({
          message: error?.message || "Error updating collection",
        });
      },
    });

  const { mutate: deleteCollection, isLoading: isDeleting } =
    api.collection.deleteCollection.useMutation({
      onSuccess: (data) => {
        client.collection.getCollection.invalidate();
        router.push("/dashboard");
        notification.success({
          message: data,
        });
      },
      onError: (error) => {
        notification.error({
          message: error?.message || "Error deleting collection",
        });
      },
    });

  const { mutate: leaveCollection, isLoading: isLeaving } =
    api.collection.leaveCollection.useMutation({
      onSuccess: (data) => {
        client.collection.getCollection.invalidate();
        router.push("/dashboard");
        notification.success({
          message: data,
        });
      },
      onError: (error) => {
        notification.error({
          message: error?.message || "Error Leaving collection",
        });
      },
    });
  const [form] = Form.useForm();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Collection Settings
          </h1>
        </div>
      </div>
      {status === "success" && (
        <div className="space-y-3">
          <Form
            form={form}
            hidden={!data.is_owner}
            disabled={!data.is_owner}
            initialValues={{
              name: data.name,
              description: data.description,
            }}
            layout="vertical"
            onFinish={(values) => {
              updateCollection({
                id: slug,
                ...values,
              });
            }}
          >
            <div className="border border-gray-200  px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    General Settings
                  </h3>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                  <Form.Item
                    name="name"
                    label="Collection Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Collection Name!",
                      },
                    ]}
                  >
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-sm font-medium text-gray-800">
                        Description
                      </span>
                    }
                    name="description"
                  >
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows={5}
                      placeholder=""
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="mt-3 text-right">
                <button
                  type="submit"
                  disabled={!data.is_owner || isUpdating}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </Form>

          {data.is_owner ? (
            <div className="border  border-gray-200 bg-white sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Delete your Collection
                </h3>

                <div className="mt-2 max-w-xl text-sm text-red-500">
                  <p>
                    This action cannot be undone. This will permanently delete
                    your collection.
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this collection?"
                        )
                      ) {
                        deleteCollection({
                          id: slug,
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border  border-gray-200 bg-white sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Leave Collection
                </h3>

                <div className="mt-2 max-w-xl text-sm text-red-500">
                  <p>
                    This action cannot be undone. You will no longer be able to
                    access this collection.
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    disabled={isLeaving}
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to leave this collection?"
                        )
                      ) {
                        leaveCollection({
                          id: slug,
                        });
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                  >
                    {isLeaving ? "Leaving..." : "Leave"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {status === "loading" && <Skeleton active />}
    </div>
  );
}
