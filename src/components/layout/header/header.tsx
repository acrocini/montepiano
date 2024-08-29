import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { HeaderMain } from "./header-main/header-main";
import { DropdownMenu, DropdownMenuProps } from "./dropdown-menu/dropdown-menu";
import { MainColorPaletteType } from "../../../constants/colors";
import { FC } from "react";

//TODO se la pagina è troppo bassa l'header si ingrippa
export interface HeaderProps extends Queries.LayoutDataFragment {
  color: MainColorPaletteType;
}

const Root = styled.div`
  position: relative;
  width: 100%;
  z-index: 100;
`;

export const Header: FC<HeaderProps> = ({
  color,
  facebookUrl,
  instagramUrl,
  whatsappUrl,
  sections,
  specialPages,
  ...props
}) => {
  const completeSections = [
    {
      slug: "",
      title: "Home",
    },
    specialPages?.includes("eventi-notizie-curiosita") && {
      slug: "events-news-curiosity",
      title: "Eventi, Notizie e Curiosità",
    },
    ...(sections ?? []),
    specialPages?.includes("contatti") && {
      slug: "contacts",
      title: "Contatti",
    },
  ].filter(Boolean) as DropdownMenuProps["sections"];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const HandleHamburgerButtonOnClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const dropDowMenuRef = useRef<HTMLDivElement>(null);
  const dropDownButtonRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideDropdown = (e: any) => {
    if (
      !dropDowMenuRef.current?.contains(e.target as Node) &&
      !dropDownButtonRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropdown);
  }, []);

  return (
    <Root>
      <HeaderMain
        color={color}
        hamburgerButtonOnClick={HandleHamburgerButtonOnClick}
        dropdownButtonRef={dropDownButtonRef}
        {...{
          facebookUrl,
          whatsappUrl,
          instagramUrl,
        }}
      />
      <DropdownMenu
        color={color}
        isOpen={isOpen}
        ref={dropDowMenuRef}
        sections={completeSections}
      />
    </Root>
  );
};
