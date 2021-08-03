import { baseUrl } from './api';
import remark from 'remark'
import html from 'remark-html'

export async function getList() {
  const fetchData = await fetch(`${baseUrl}/queryList?parentId=BBc3lkESy`);
  const res = await fetchData.json();
  let files = [];
  if (res.code === 200) {
    files = res.data.map(i => ({
      id: i._id,
      title: i.title,
      date: i.createTime
    }))
  }
  return files.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
}

export async function getAllPostIds() {
  const fetchData = await fetch(`${baseUrl}/queryList?parentId=BBc3lkESy`);
  const res = await fetchData.json();
  let files = [];
  if (res.code === 200) {
    files = res.data.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    }).map(i => ({
      params: {
        id: i._id,
        title: i.title,
        date: i.createTime
      }
    }))
  }
  return files;
}

export async function getPostData(id: string) {
  const fetchData = await fetch(`${baseUrl}/getOne?_id=${id}`);
  const res = await fetchData.json();
  let content = {};
  if (res.code === 200) {
    const processedContent = await remark()
      .use(html)
      .process(res.data.mdString);
    const contentHtml = processedContent.toString();
    content = {
      id,
      title: res.data.title,
      date: res.data.createTime,
      contentHtml
    };
  }

  // Combine the data with the id
  return content;
}