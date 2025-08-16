"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths = pathName === "/" ? [""] : pathName.split("/").filter(Boolean);
  console.log(pathName, paths)

  return (
    <div className="flex items-center flex-start">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.length <= 1 ? (
            <BreadcrumbItem>
              <BreadcrumbLink className="capitalize" href={pathName}>
                {paths[0] || "home"}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            paths.map((path, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="capitalize"
                    href={"/" + paths.slice(0, index + 1).join("/")}
                  >
                    {path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < paths.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
