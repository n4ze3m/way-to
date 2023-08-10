import {
  GlobeAltIcon,
  LinkIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Open Source Empowerment",
    description:
      "We believe in the strength of community. WayTo.Website is open source, inviting you to shape the future of workspace linking.",
    icon: GlobeAltIcon,
  },
  {
    name: "Swift & Adaptable",
    description:
      "Design custom to links that resonate with your workspace's ethos. Customize links for clear, cohesive communication.",
    icon: LinkIcon,
  },
  {
    name: "Dependability First",
    description:
      "Rely on our robust redirection. Your waytos will guide your colleagues exactly where they need to go.",
    icon: LockClosedIcon,
  },
];

export default function Feature() {
  return (
    <div className="mb-12 bg-white py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Elevate Your Link Sharing Experience with Way To Website
          </p>
          <p className="mt-6 text-md leading-8 text-gray-600">
            In the age of rapid information exchange, smooth collaboration is
            non-negotiable. Way To Website emerges as the ultimate solution,
            addressing the complexities of sharing links and enabling seamless
            integration within your team's workflow.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
