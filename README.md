# service 服务使用

## useFetch

```jsx
import { useFetch } from '@season/request';

const Demo = () => {
  const [params, setParams] = useState({ a: 1, b: 2 });

  const { loading, refresh, data } = useFetch<
    Record<string, any>,
    { page: number; pageSize: number; data: { name: string }[] }
  >({
    url: api.demoUrl,
    method: 'post',
    data: params,
  });

  const handleClick = () => {
    // setParams({ a: 2, b: Math.random() }); // 不断变化的param也会触发fetch请求不断执行
    refresh();
  };

  return (
    <>
      <div onClick={handleClick}>Demo</div>
      {loading ? <Spin /> : null}
    </>
  );
};

```

## fetch

正常使用

```tsx
import { fetch } from "@season/request";

useEffect(() => {
  fetch(config).then((res) => console.log(res));
}, []);
```
