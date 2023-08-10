import { Empty, Form, Modal, Skeleton, notification } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function MembersBody() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const { slug } = router.query as {
    slug: string;
  };
  const { status, data } = api.collection.collectionMembers.useQuery({
    id: slug,
  });

  const [form] = Form.useForm();
  React.useEffect(() => {
    if (status === "error") {
      router.push("/404");
    }
  }, [status, data]);

  const client = api.useContext();

  const { mutate: inviteUser, isLoading: isInvitingUser } =
    api.collection.inviteAUserToCollection.useMutation({
      onSuccess: (data) => {
        client.collection.collectionMembers.invalidate({ id: slug });
        setOpen(false);
        form.resetFields();
        notification.success({
          message: data,
        });
      },
      onError: (error) => {
        notification.error({
          message: error?.message || "Error inviting user to collection",
        });
      },
    });

  const { mutate: removeUser, isLoading: isRemovingUser } =
    api.collection.removeUserFromCollection.useMutation({
      onSuccess: (data) => {
        client.collection.collectionMembers.invalidate({ id: slug });
        notification.success({
          message: data,
        });
      },
      onError: (error) => {
        notification.error({
          message: error?.message || "Error removing user from collection",
        });
      },
    });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {status === "loading" && <Skeleton active />}
      {status === "success" && (
        <>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Members of Collection
              </h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              {data.is_editable && (
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add a member
                </button>
              )}
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  {data.members.length === 0 && (
                    <Empty description="No members found" className="m-8" />
                  )}
                  {data.members.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Joined
                          </th>
                          {data.is_editable && (
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Actions
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {data.members.map((member) => {
                          return (
                            <tr key={member.id}>
                              <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-gray-900">
                                {member.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                                {dayjs(member.joined_at).format(
                                  "MMMM DD, YYYY"
                                )}
                              </td>
                              {data.is_editable && (
                                <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                                  <button
                                    onClick={() => {
                                      const ok = confirm(
                                        "Are you sure you want to remove this user from the collection?"
                                      );
                                      if (!ok) {
                                        return;
                                      }
                                      removeUser({
                                        id: slug,
                                        user_id: member.id,
                                      });
                                    }}
                                    disabled={isRemovingUser}
                                    type="button"
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => setOpen(true)}
            footer={null}
            title="Add a member"
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                inviteUser({
                  id: slug,
                  email: values.email,
                });
              }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input an email",
                  },
                ]}
              >
                <input
                  type="email"
                  placeholder="joe@doe.com"
                  className="block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  disabled={isInvitingUser}
                  className="relative w-full  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isInvitingUser ? "Inviting..." : "Invite"}
                </button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
}
