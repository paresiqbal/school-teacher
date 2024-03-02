type DetailTeacherPageProps = { params: { slug: string } };

export default function DetailTeacherPage({ params }: DetailTeacherPageProps) {
  console.log(params);

  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}
