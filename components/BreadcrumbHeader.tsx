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
import Link from "next/link";

const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths = pathName === "/" ? [""] : pathName.split("/");

  return (
    <div className="hidden md:flex items-center flex-start truncate">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className="text-base">
                  <BreadcrumbLink asChild>
                    <Link
                      href={
                        index === 0
                          ? "/"
                          : "/" + paths.slice(1, index + 1).join("/")
                      }
                      className={`capitalize ${
                        isLast ? "text-primary font-medium" : "text-gray-500"
                      }`}
                    >
                      {path === "" ? "home" : path}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
