sales = data.sales;
orders = data.orders;

sales.sort((a, b) => a.createdAt - b.createdAt);
console.log(sales)

function initSalesGraph() {
    sales.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#sales-graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(sales.map(d => d.createdAt))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(sales, d => d.bill)])
        .range([height, 0]);

    svg.selectAll("rect")
        .data(sales)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.createdAt))
        .attr("y", d => yScale(d.bill))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.bill))
        .attr("fill", "steelblue");

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d %H:%M")))
        .selectAll("text")
        .style("text-anchor", "end");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Created At");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Bill $$$ ");

    svg.append("g")
        .call(d3.axisLeft(yScale));

}


function initOrdersGraph() {
    orders.forEach(d => {
        d._id = new Date(d._id);
    });

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#orders-graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(orders.map(d => d._id))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(orders, d => d.count)])
        .range([height, 0]);

    svg.selectAll("rect")
        .data(orders)
        .enter()
        .append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => xScale(d._id))
        .attr("y", d => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.count));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d")))
        .selectAll("text")
        .style("text-anchor", "end");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Count");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Date");

    svg.append("g")
        .call(d3.axisLeft(yScale));

}


initSalesGraph();
initOrdersGraph();