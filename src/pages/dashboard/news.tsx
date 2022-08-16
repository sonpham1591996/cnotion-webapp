import { Loader } from "@/components/Loader";
import { loadCryptoNews } from "@/services/NewsService";
import { prettyDate } from "@/shared/utils";
import { Main } from "@/templates/Main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function News() {
  const [newsData, setNewsData] = useState<
    | {
        data: Array<{
          title: string;
          published_at: string;
        }>;
        max_page: number;
        hasMore: boolean;
      }
    | undefined
  >();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const page_number = +String(router.query.page_number) ?? 1;
    if (!newsData || page_number > 0) {
      setPageNumber(page_number);
      loadCryptoNews(page_number).then((data: any) => setNewsData(data));
    }
  }, [newsData, router.query]);

  if (!newsData) {
    return <Loader />;
  }

  return (
    <Main meta="Crypto News">
      <div className="container w-md mx-auto overflow-x-auto relative lg:my-16">
        <table className="table-auto w-full text-sm text-left text-gray-600">
          <thead className="text-md text-white uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Published At
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {newsData.data.map((d: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{prettyDate(d.published_at)}</td>
                  <td className="py-4 px-6">{d.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {newsData.max_page > 1 && (
          <nav
            aria-label="Page navigation example"
            className="flex justify-end my-4"
          >
            <ul className="inline-flex -space-x-px">
              <li>
                <a
                  href={`?page_number=${
                    pageNumber > 1 ? pageNumber - 1 : pageNumber
                  }`}
                  className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              {}
              <li>
                <a
                  href="?page_number=1"
                  aria-current={pageNumber === 1 ? "page" : "false"}
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="?page_number=2"
                  aria-current={pageNumber === 2 ? "page" : "false"}
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  aria-disabled="true"
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href={`?page_number=${
                    pageNumber < newsData.max_page ? pageNumber + 1 : pageNumber
                  }`}
                  className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </Main>
  );
}

export default News;
