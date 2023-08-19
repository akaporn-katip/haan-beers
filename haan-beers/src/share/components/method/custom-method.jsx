import User from "src/share/components/user/user";
import Card from "src/share/components/card/card";
import { useEffect, useState } from "react";

export default function CustomMethod({ product, onSubmit }) {
  const [total, setTotal] = useState(product.total);
  const [totalRounded, setTotalRounded] = useState(0);
  const [isRounded, setIsRounded] = useState(false);

  const [participants, setParticipants] = useState(
    Object.values(product.participants)
  );

  const participants_count = participants.length;

  const handleTotalInput = (e) => {
    if (e.target.value === "" || /^[0-9\b]+$/g.test(e.target.value)) {
      setTotal(e.target.value);
      setIsRounded(false);
    }
  };

  const handleTotalBlur = (e) => {
    const value = Number(e.target.value);
    const rounded = Math.ceil(value / participants_count);
    const round_total = rounded * participants_count;
    if (value != round_total) {
      setTotal(round_total);
      setTotalRounded(round_total);
      setIsRounded(round_total != value);
      setParticipants((prev) => prev.map((p) => ({ ...p, total: rounded })));
    }
  };

  const handleParticipantInput = (e, index) => {
    const value = Number(e.target.value);
    participants[index] = {
      ...participants[index],
      [e.target.name]: value,
    };
    setParticipants([...participants]);
    setIsRounded(false);
  };

  const handleParticipantBlur = () => {
    const sum = participants.reduce((a, b) => a + b.total, 0);
    setTotal(sum);
  };

  const handleSubmit = () => {
    onSubmit({
      ...product,
      total: total,
      participants: participants.reduce(
        (previous, current) => ({ ...previous, [current.id]: current }),
        {}
      ),
    });
  };

  return (
    <Card>
      <Card.Title>
        ราคา{" "}
        <input
          type="text"
          name="total"
          value={total}
          onInput={handleTotalInput}
          onBlur={handleTotalBlur}
        />
        <p>
          <span className="text-sm">
            {isRounded ? "ปัดขึ้นเพื่อให้หารลงตัว" : ""} total : {total} ,
            totalRounded : {totalRounded}
          </span>
        </p>
      </Card.Title>
      <Card.Body>
        <div className="flex flex-col gap-2">
          {participants.map((participant, i) => (
            <div className="flex justify-between" key={participant.id}>
              <User user={participant} uniqueKey="id" />
              <input
                name="total"
                type="text"
                value={participant.total}
                onInput={(e) => handleParticipantInput(e, i)}
                onBlur={handleParticipantBlur}
              />
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Action>
        <button className="btn btn-submit" onClick={handleSubmit}>
          ตกลง
        </button>
      </Card.Action>
    </Card>
  );
}
