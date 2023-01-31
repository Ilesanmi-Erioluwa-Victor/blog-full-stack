import React from 'react'


interface headerType {
  title: string;
  icon?: any;
  link: string;
  active: boolean;
  dropDown?: {
    title: string;
    href: string;
  }[];
}

let header: headerType[] = [
  {
    title: "Home",
    icon: "",
    link: "/",
    active: true,
  },
  {
    title: "Create",
    icon: <ChevronDownIcon className="w-5 h-5" />,
    link: "/create-post",
    active: false,
  },
  {
    title: "Posts",
    icon: "",
    link: "/onboarding",
    active: false,
  },
  {
    title: "employer",
    icon: "",
    link: "/employer",
    active: false,
  },
  {
    title: "Hire talent",
    icon: "",
    link: "/hire-talent",
    active: false,
  },
  {
    title: "remote jobs",
    icon: "",
    link: "/remote-jobs",
    active: false,
  },
];

const PublicNav = () => {
  return (
    <div>
      
    </div>
  )
}




export default PublicNav
