const banner = {
    borderRadius: "8px",
    bgColor: "bannerBg",
    color: "white",
    py: "6",
    px: "8",
};

export const layerStyles = {
    card: {
        p: "6",
        bgColor: "card.bg",
        borderRadius: "8px",
        borderWidth: "1px",
        borderColor: "card.border",
    },
    banner,
    "banner-pattern": {
        backgroundImage: "../../banner-bg.png",
        ...banner,
    },
    "banner-content": {},
    "container-data": {
        borderRadius: 10,
        bgColor: "card.bg",
        border: "1px solid",
        borderColor: "card.border",
    },
    "table-th-base": {
        py: "16px",
        px: "12px",
        borderBottomWidth: "0",
        color: "baseText",
        bg: "card.headerBg",
        bgColor: "card.headerBg",
        backgroundColor: "card.headerBg",
    },
    "table-td-base": {
        fontWeight: "400",
        border: "none",
    },
};
