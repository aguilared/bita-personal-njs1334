import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.bitacora.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      author: {
        select: { name: true },
      },
      _count: {
        select: { bita_events: true },
      },
    },
  });
  res.json(result);
}
