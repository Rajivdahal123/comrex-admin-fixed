import React, { useEffect, useMemo, useState } from 'react';

import Button from './Button';

type IMainProps = {
  perPage: number;
  page: number;
  onChangePage: (page: number) => void;
  totalCount: number;
};

const PageNationBar = ({
  perPage,
  page,
  onChangePage,
  totalCount,
}: IMainProps) => {
  const [barState, setBarState] = useState(0);

  const pageCount = useMemo(() => Math.ceil(totalCount / perPage), [totalCount, perPage]);

  useEffect(() => {
    if (pageCount < 7) {
      setBarState(0);
    } else if (page < 4) {
      setBarState(1);
    } else if (pageCount - page < 5) {
      setBarState(2);
    } else {
      setBarState(3);
    }
  }, [totalCount, page, pageCount]);

  return (
    <div className="flex">
      <Button
        className="text-sm rounded-r-none bg-white border border-grayHover hover:bg-grayHover px-1 py-1"
        disabled={page === 0}
        onClick={() => onChangePage(page - 1)}
        label="Previous"
      />
      {
        barState === 0
        && (new Array(pageCount).fill('').map((value, key) => (
          <Button
            key={`k_${key * key}_${value}`}
            className={`text-sm rounded-none border border-l-0  px-1 py-1 w-8 sm:w-8
              ${page === key ? 'bg-primary text-white border-primary hover:bg-primaryHover hover:border-primaryHover' : 'bg-white border-grayHover hover:bg-grayHover'}`}
            onClick={() => onChangePage(key)}
            label={(key + 1).toString()}
          />
        )))
      }
      {
        barState === 1
        && (
          <>
            {new Array(5).fill('').map((value, key) => (
              <Button
                key={`k_${key * key}_${value}`}
                className={`text-sm rounded-none border border-l-0  px-1 py-1 w-8 sm:w-8
              ${page === key ? 'bg-primary text-white border-primary hover:bg-primaryHover hover:border-primaryHover' : 'bg-white border-grayHover hover:bg-grayHover'}`}
                onClick={() => onChangePage(key)}
                label={(key + 1).toString()}
              />
            ))}
            <div className="font-base text-sm rounded-none border border-l-0  px-1 py-1 w-8 bg-white border-grayHover hover:bg-grayHover text-center">
              ...
            </div>
            <Button
              className={`text-sm rounded-none border border-l-0  px-1 py-1 w-8 sm:w-8
              ${page === pageCount - 1 ? 'bg-primary text-white border-primary hover:bg-primaryHover hover:border-primaryHover' : 'bg-white border-grayHover hover:bg-grayHover'}`}
              onClick={() => onChangePage(pageCount - 1)}
              label={pageCount.toString()}
            />
          </>
        )
      }
      {
        barState === 2
        && (
          <>
            <Button
              className={`font-base text-sm rounded-none border border-l-0  px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8
              ${page === 0 ? 'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark' : 'bg-white  border-grayHover hover:bg-grayHover'}`}
              onClick={() => onChangePage(0)}
              label="1"
            />
            <div className="font-base text-sm rounded-none border border-l-0  px-1 py-1 w-8 sm:w-8 bg-white border-grayHover hover:bg-grayHover text-center">
              ...
            </div>
            {new Array(5).fill('').map((value, key) => (
              <Button
                key={`k_${key * key}_${value}`}
                className={`font-base text-sm rounded-none border border-l-0  px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8
              ${page === pageCount - 5 + key ? 'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark' : 'bg-white  border-grayHover hover:bg-grayHover'}`}
                onClick={() => onChangePage(pageCount - 5 + key)}
                label={(pageCount - 4 + key).toString()}
              />
            ))}
          </>
        )
      }
      {
        barState === 3
        && (
          <>
            <Button
              className={`font-base text-sm rounded-none border border-l-0  px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8
              ${page === 0 ? 'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark' : 'bg-white  border-grayHover hover:bg-grayHover'}`}
              onClick={() => onChangePage(0)}
              label="1"
            />
            <div className="font-base text-sm rounded-none border border-l-0 px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8 bg-white border-grayHover hover:bg-grayHover text-center">
              ...
            </div>
            {new Array(3).fill('').map((value, key) => (
              <Button
                key={`k_${key * key}_${value}`}
                className={`font-base text-sm rounded-none border border-l-0  px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8
              ${page === page - 1 + key ? 'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark' : 'bg-white  border-grayHover hover:bg-grayHover'}`}
                onClick={() => onChangePage(page - 1 + key)}
                label={(page + key).toString()}
              />
            ))}
            <div className="font-base text-sm rounded-none border border-l-0  px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8 bg-white  border-grayHover hover:bg-grayHover text-center">
              ...
            </div>
            <Button
              className={`font-base text-sm rounded-none border border-l-0  px-1 py-1 xs:px-1 xs:py-1 w-8 sm:w-8
              ${page === pageCount - 1 ? 'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark' : 'bg-white  border-grayHover hover:bg-grayHover'}`}
              onClick={() => onChangePage(pageCount - 1)}
              label={pageCount.toString()}
            />
          </>
        )
      }
      <Button
        className="font-base text-sm rounded-l-none bg-white border border-grayHover border-l-0 hover:bg-grayHover px-1 py-1"
        disabled={page === Math.ceil(totalCount / perPage) - 1 || totalCount === 0}
        onClick={() => onChangePage(page + 1)}
        label="Next"
      />
    </div>
  );
};

export default PageNationBar;
