import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { IResult, IKeywords } from "./Interfaces";

interface IProps {
  result: IResult;
}

const NYTDisplay = ({ result }: IProps) => {
  console.log(result);
  return (
    <Card style={{ margin: "1em", width: "30%" }}>
      <CardBody>
        <CardTitle>{result.headline.main}</CardTitle>
        {result.multimedia.length > 1 ? (
          <CardImg
            alt="article"
            src={`https://www.nytimes.com/${result.multimedia[1].url}`}
          />
        ) : (
          ""
        )}
        <CardSubtitle>
          {result.snippet}
          <br />
          {result.keywords.length > 0 ? " Keywords: " : ""}
        </CardSubtitle>
        {result.keywords.map((keyword: IKeywords) => (
          <CardText key={keyword.value}>{keyword.value}</CardText>
        ))}
        <a href={result.web_url}>
          <Button>Read It</Button>
        </a>
      </CardBody>
    </Card>
  );
};

export default NYTDisplay;
