import { ChangeEvent, Component, FormEvent, SyntheticEvent } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import NYTDisplay from "./NYTDisplay";
import { IResult, INYTResponse } from "./Interfaces";

interface IState {
  searchTerm: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  results: IResult[];
}

export default class NYTResults extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: "",
      startDate: "",
      endDate: "",
      results: [],
      pageNumber: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nytFetch = async () => {
    let base_url: string =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let key: string = "S0iwMsrXcgsXcoHQY6IEPYMcGX7NmMMU";
    let url: string = `${base_url}?api-key=${key}&q=${this.state.searchTerm}&page=${this.state.pageNumber}`;

    if (this.state.startDate) {
      url = `${url}&start-date=${this.state.startDate}`;
    }
    if (this.state.endDate) {
      url = `${url}&end-date=${this.state.endDate}`;
    }

    console.log(url);

    const response: Response = await fetch(url);
    const data: INYTResponse = await response.json();
    this.setState((prevState: IState) => ({
      ...prevState,
      results: data.response.docs,
    }));
  };

  handleSubmit(event: FormEvent): void {
    event.preventDefault();
    this.setState({ pageNumber: 0 });
    this.nytFetch();
  }


  //TODO: There are two ways we can write this handleChange. Both do the same. It's just to showcase the casting and pick type.

  // handleChange(event: ChangeEvent): void {
  //   const input = event.target as HTMLInputElement;
  //   console.log(input.name, input.value);
  //   this.setState((prevstate: IState) => {
  //     let pick: Pick<IState, keyof IState> = {
  //       ...prevstate,
  //       [input.name]: input.value,
  //     };
  //     console.log(pick);
  //     return pick;
  //   });
  // }

  // handleChange(event: ChangeEvent): void {
  //   const input = event.target as HTMLInputElement;
  //   console.log(input.name, input.value);
  //   this.setState(
  //     (prevstate: IState) =>
  //       ({ ...prevstate, [input.name]: input.value } as Pick<
  //         IState, //type
  //         keyof IState //the keys from this type (these are types)
  //       >)
  //   );
  // }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const {name, value}  = event.target;
    this.setState((prevState: IState) => ({
      ...prevState,
      [name]: value
    }))
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="searchTerm">Enter a search term</Label>
            <Input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Enter a search term</Label>
            <Input
              type="text"
              id="startDate"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">Enter a search term</Label>
            <Input
              type="text"
              id="endDate"
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Search</Button>
        </Form>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.results.length > 0
            ? this.state.results.map((result: IResult) => {
                return <NYTDisplay key={result._id} result={result}/>;
              })
            : null}
        </div>
      </div>
    );
  }
}
