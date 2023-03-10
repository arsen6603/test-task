import React, {useState} from 'react';
import {Comment} from "../../../interfaces/Comment";
import News from "../../../actions/News";
import {timeConverter} from "../../../utils/timeConverter";

interface Props {
    comment: Comment
}

const CommentCard: React.FC<Props> = ({comment}) => {
    const [additionalComments, setAdditionalComments] = useState<Comment[]>([])

    const getAdditionalComments = () => {
        const promises = [];

        for (const id of comment.kids) {
            const promise = News.getComments(id)
            promises.push(promise);
        }

        Promise.all(promises)
            .then(comment => {
                setAdditionalComments(comment)
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <>
            <div className="CommentCard">
                <div className="CommentCard__Author">
                    @{comment.by}
                </div>
                <div className="CommentCard__Text">
                    {comment.text}
                </div>
                <div className="CommentCard__Text">
                    {comment.text}
                </div>
                <div className="CommentCard__Date">published: {timeConverter(comment.time)}</div>
            </div>
            {comment?.kids?.length > 0 && (additionalComments?.length ?? 0) < 1 ?
                <div className="AdditionalComment" onClick={getAdditionalComments}>More
                </div>
                : null}
            {additionalComments?.map(el => (
                <div className="AdditionalCommentCard">
                    <div className="CommentCard__Author">
                        @{comment.by}
                    </div>
                    <div className="CommentCard__Text">
                        {comment.text}
                    </div>
                    <div className="CommentCard__Text">
                        {comment.text}
                    </div>
                    <div className="CommentCard__Date">published: {timeConverter(comment.time)}</div>
                </div>
            ))}
        </>
    );
};

export default CommentCard;