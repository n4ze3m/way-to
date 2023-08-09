import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Form, Modal, notification, Select } from "antd"
import axios from "axios"
import logoImage from "data-base64:~components/logo.png"
import React from "react"

import { useCookie } from "~hooks/useCookie"
import useCurrentTabUrl from "~hooks/useCurrentTabUrl"

import { UrlInput } from "./UrlInput"

export default function Link() {
  const { removeCookie } = useCookie()
  const currnetUrl = useCurrentTabUrl()

  const [openModal, setOpenModal] = React.useState(false)

  const [form] = Form.useForm()

  const { cookie } = useCookie()
  const [collections, setCollections] = React.useState<
    { id: string; name: string }[]
  >([])

  const { data: coll, isLoading } = useQuery(["getCollections"], async () => {
    const response = await axios.post(
      `${process.env.PLASMO_PUBLIC_HOST}api/token/collections`,
      {
        access_token: cookie
      }
    )
    return response.data
  })

  React.useEffect(() => {
    if (!isLoading && coll) {
      setCollections(coll.collections)
    }
  }, [coll, isLoading])

  React.useEffect(() => {
    if (currnetUrl) {
      form.setFieldsValue({
        url: currnetUrl
      })
    }
  }, [currnetUrl])

  const createCollection = async (value: any) => {
    const response = await axios.post(
      `${process.env.PLASMO_PUBLIC_HOST}api/token/collections/create`,
      {
        access_token: cookie,
        name: value.collection_name
      }
    )
    return response.data
  }

  const { mutate: createCollectionMutation, isLoading: isCreatingCollection } =
    useMutation(createCollection, {
      onSuccess: (data) => {
        setCollections((prev) => [...prev, data])
        form.setFieldsValue({
          collection_id: data.id
        })
        setOpenModal(false)
      },
      onError: (error) => {
        notification.error({
          message: "Error",
          description: "Failed to create collection"
        })
      }
    })

  const onFinish = async (values: any) => {
    const response = await axios.post(
      `${process.env.PLASMO_PUBLIC_HOST}api/token/collections/add`,
      {
        ...values,
        access_token: cookie
      }
    )
    return response.data
  }

  const { mutate: addLinkMutation, isLoading: isAddingLink } = useMutation(
    onFinish,
    {
      onSuccess: () => {
        window.close()
      },
      onError: (error) => {
        notification.error({
          message: "Error",
          description: "Failed to add link"
        })
      }
    }
  )

  return (
    <div
      style={{
        width: 600,
        height: 600
      }}
      className="isolate bg-gray-100 text-gray-800">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Component Start */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 md:justify-start md:space-x-10">
        <div>
          <div className="flex flex-shrink-0 items-center px-4">
            <img className="h-10 w-auto" src={logoImage} alt="WayTo" />

            <span className="ml-1 text-sm font-bold">Way To Website</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 shadow-sm focus:ring-inset focus:ring-indigo-500"
            onClick={() => removeCookie()}>
            <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="px-6">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 mt-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={addLinkMutation}
            initialValues={{
              url: currnetUrl
            }}>
            <Form.Item
              name="url"
              label="Destination URL"
              rules={[{ required: true, message: "Please input a URL!" }]}>
              <input
                type="url"
                className="w-full rounded-md border border-gray-300 px-2 py-1  focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter URL"
              />
            </Form.Item>

            <Form.Item
              name="to_path"
              label="Path Name"
              rules={[
                { required: true, message: "Please input a path name!" }
              ]}>
              <UrlInput placeholder="Enter Collection Name" />
            </Form.Item>

            <Form.Item
              name="collection_id"
              label="Collection"
              rules={[
                { required: true, message: "Please select a collection!" }
              ]}>
              <Select
                onChange={(value) => {
                  if (value === "new") {
                    setOpenModal(true)
                  }
                }}
                placeholder="Select a collection"
                disabled={isLoading}
                loading={isLoading}>
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
                className="relative w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
            collection_id: undefined
          })
          setOpenModal(false)
        }}
        onOk={() => {
          form.setFieldsValue({
            collection_id: undefined
          })
          setOpenModal(false)
        }}>
        <Form onFinish={createCollectionMutation} layout="vertical">
          <Form.Item
            name="collection_name"
            label="Collection Name"
            rules={[
              { required: true, message: "Please input a collection name!" }
            ]}>
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
              type="submit">
              {isCreatingCollection ? "Creating..." : "Create"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
