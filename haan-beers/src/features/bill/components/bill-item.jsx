import Card from "src/share/components/card/card";
import Link from "next/link";
import User from "src/share/components/user/user";

export default function BillItem({ form }) {
  const _friends = Object.values(form.participants);
  
  return (
    <Card>
      <Card.Title>{form.title}</Card.Title>
      <Card.Body>
        <div className="flex flex-col gap-2">
          {_friends.map((participant) => (
            <div
              key={participant.id}
              className="flex justify-between items-center"
            >
              <User user={participant} />
              <div>status</div>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Action>
        <Link href={`/bill/${form.id}`}>
          <button className="btn btn-primary">รายละเอียด</button>
        </Link>
      </Card.Action>
    </Card>
  );
}
