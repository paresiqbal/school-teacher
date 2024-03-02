export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>My Post: {params.slug}</h1>
    </div>
  );
}
