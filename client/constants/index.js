// navbar
export const navbar = [
  {
    _id: "1",
    title: "Home",
    link: "/",
  },
  {
    _id: "2",
    title: "About Us",
    link: "",
    submenu: [
      {
        _id: "1",
        title: "Company profile",
        link: "/company-profile",
      },
      {
        _id: "2",
        title: "About the Founder",
        link: "/founder",
      },
      {
        _id: "3",
        title: "Team of Planter box",
        link: "/team",
      },
    ],
  },
  {
    _id: "3",
    title: "Business",
    link: "/business",
  },
  {
    _id: "4",
    title: "Projects",
    link: "/projects",
    submenu: [
      {
        _id: "1",
        title: "Exterior",
        link: "/projectType?type=Exterior Design",
      },

      {
        _id: "2",
        title: "Interior",
        link: "/projectType?type=Interior Design",
      },
      {
        _id: "3",
        title: "Master Plan",
        link: "/projectType?type=Master Plan",
      },
    ],
  },
  {
    _id: "5",
    title: "Career Objectives",
    link: "/career",
  },
  {
    _id: "6",
    title: "Contact",
    link: "/contact",
  },
];
