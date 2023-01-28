const size = {
  mobileX: "280px",
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "467px",
  tabletX: "500px",
  tabletM: "768px",
  tabletL: "1000px",
  laptop: "1004px",
  laptopL: "1440px",
  desktop: "2560px",
  mediumtablet: "800px",
};

export const mediaMindevice = {
  mobileX: "280px",
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tabletX: `(min-width: ${size.tabletX})`,
  tabletM: `(min-width: ${size.tabletM})`,
  tabletL: `(min-width: ${size.tabletL})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
  mediumtablet: `(min-width : ${size.mediumtablet})`,
};

export const mediaMaxdevice = {
  mobileX: `(max-width: ${size.mobileX})`,
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletX: `(max-width: ${size.tabletX})`,
  tabletM: `(max-width: ${size.tabletM})`,
  tabletL: `(max-width: ${size.tabletL})`,
  mediumtablet: `(max-width : ${size.mediumtablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};