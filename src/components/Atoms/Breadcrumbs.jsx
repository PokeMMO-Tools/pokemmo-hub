import { Link } from "gatsby";
import React from "react";
import { Breadcrumb, Stack } from "react-bootstrap";
import { useDarkMode } from "../../context/DarkModeContext";
import { Typography } from "../Atoms";
import { useTranslations } from "../../context/TranslationsContext";

export const Breadcrumbs = ({ breadcrumbs, location, label }) => {
    const { isDark } = useDarkMode()
    const { t } = useTranslations()

    if (!breadcrumbs) return;
    const { crumbs } = breadcrumbs

    return (
        <Stack direction="horizontal" gap={1} className="border-bottom pb-1 flex-wrap">
            <Typography as="span">You are here: </Typography>
            &nbsp;
            <Breadcrumb className="mb-0 h5">
                {
                    crumbs.map((crumb, index, crumbs) => (
                        <Breadcrumb.Item
                            key={index}
                            active={index === crumbs.length - 1 ? true : false}
                            linkAs={Link}
                            linkProps={{
                                to: (crumb.pathname === '/tools' || crumb.pathname === '/market') ? '/' : crumb.pathname,
                                style: { color: isDark ? "white" : false, textDecoration: 'none' }
                            }}>
                            {
                                index === crumbs.length - 1
                                    ? label
                                    : t(crumb.crumbLabel)
                            }
                        </Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        </Stack >
    )
}
