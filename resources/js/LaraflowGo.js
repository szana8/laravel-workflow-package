exports.initLaraflowGo = (div, palettes) => {
    var lightText = 'whitesmoke';

    window.laraflowGo = GO(go.Diagram, div, {
        initialContentAlignment: go.Spot.Center,
        allowDrop: true,  // must be true to accept drops from the Palette
        "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
        "LinkRelinked": showLinkLabel,
        //"animationManager.duration": 600, // slightly longer than default (600ms) animation
        "undoManager.isEnabled": true,  // enable undo & redo
        "animationManager.isEnabled": false,
    });

    window.laraflowGo.addDiagramListener("Modified", function (e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !window.laraflowGo.isModified;
        var idx = document.title.indexOf("*");
        if (window.laraflowGo.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });

    // Set the palettes
    setPalettes(palettes);

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    window.laraflowGo.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    window.laraflowGo.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    /**
     * Set the link labels to visible.
     *
     * @param e
     */
    function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        label.visible;
    }

    /**
     * Set the default node style of the laraflowGo diagram.
     *
     * @returns {[null,null]}
     */
    function nodeStyle() {
        return [
            // The Node.location comes from the "loc" property of the node data,
            // converted by the Point.parse static method.
            // If the Node.location is changed, it updates the "loc" property of the node data,
            // converting back using the Point.stringify static method.
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                // the Node.location is at the center of each node
                locationSpot: go.Spot.Center,
                //isShadowed: true,
                //shadowColor: "#888",
                // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function (e, obj) {
                    var diagram = obj.part.diagram;
                    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;

                    obj.ports.each(function (port) {
                        port.stroke = (true ? "white" : null);
                    });
                },
                mouseLeave: function (e, obj) {
                    var diagram = obj.part.diagram;
                    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;

                    obj.ports.each(function (port) {
                        port.stroke = (false ? "white" : null);
                    });
                }
            }
        ];
    }

    /**
     * Set the ports style of the laraflowGo diagram objects.
     *
     * @param name
     * @param spot
     * @param output
     * @param input
     * @returns {*}
     */
    function makePort(name, spot, output, input) {
        return GO(go.Shape, "Circle", {
            fill: "transparent",
            stroke: null,  // this is changed to "white" in the showPorts function
            desiredSize: new go.Size(8, 8),
            alignment: spot,
            alignmentFocus: spot,  // align the port on the main Shape
            portId: name,  // declare this object to be a "port"
            fromSpot: spot,
            toSpot: spot,  // declare where links may connect at this port
            fromLinkable: output,
            toLinkable: input,  // declare whether the user may draw links to/from here
            cursor: "pointer"  // show a different cursor to indicate potential link point
        });
    }

    function makeSVG() {
        this.svg = laraflowGo.makeSvg({
            scale: 0.5
        });

        this.svg.style.border = "1px solid black";
        var obj = document.getElementById("SVGArea");
        obj.appendChild(this.svg);

        if (obj.children.length > 0) {
            obj.replaceChild(this.svg, obj.children[0]);
        }
    }

    function setPalettes(palettes) {
        // Set the default palette of the laraflowGo
        defaultPalette();

        // Set the Start palette of the laraflowGo
        startPalette();

        // Set the End palette of the laraflowGo
        endPalette();

        // Set the comment palette of the laraflowGo
        //commentPalette();

        if(!palettes) {
            palettes = {
                primary: {
                    name: "primary",
                    color: "#3097D1",
                },
                warning: {
                    name: "warning",
                    color: "#CBB956",
                },
                success: {
                    name: "success",
                    color: "#2AB27B",
                },
                danger: {
                    name: "danger",
                    color: "#78341A",
                }
            };
        }

        // Set the other palettes of the laraflowGo
        setOtherPalettes(palettes);

        // Set the links
        linkTemplate();
    }

    function defaultPalette() {
        window.laraflowGo.nodeTemplateMap.add("",  // the default category
            GO(go.Node, "Spot", nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                GO(go.Panel, "Auto",
                    GO(go.Shape, "Rectangle", {
                            fill: "#00A9C9",
                            stroke: null
                        },
                        new go.Binding("figure", "figure")
                    ),
                    GO(go.TextBlock, {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText,
                            margin: 8,
                            maxSize: new go.Size(160, NaN),
                            wrap: go.TextBlock.WrapFit,
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay()
                    )
                ),
                // four named ports, one on each side:
                makePort("T", go.Spot.Top, false, true),
                makePort("L", go.Spot.Left, true, true),
                makePort("R", go.Spot.Right, true, true),
                makePort("B", go.Spot.Bottom, true, false)
            ));
    }

    function startPalette() {
        window.laraflowGo.nodeTemplateMap.add("Start",
            GO(go.Node, "Spot", nodeStyle(),
                GO(go.Panel, "Auto",
                    GO(go.Shape, "Circle", {
                        minSize: new go.Size(40, 40),
                        fill: "#79C900",
                        stroke: null
                    }),
                    GO(go.TextBlock, "Start", {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText
                        },
                        new go.Binding("text")
                    )
                ),
                // three named ports, one on each side except the top, all output only:
                makePort("L", go.Spot.Left, true, false),
                makePort("R", go.Spot.Right, true, false),
                makePort("B", go.Spot.Bottom, true, false)
            )
        );
    }

    function endPalette() {
        window.laraflowGo.nodeTemplateMap.add("End",
            GO(go.Node, "Spot", nodeStyle(),
                GO(go.Panel, "Auto",
                    GO(go.Shape, "Circle", {
                        minSize: new go.Size(40, 40),
                        fill: "#DC3C00",
                        stroke: null
                    }),
                    GO(go.TextBlock, "End", {
                            font: "bold 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText
                        },
                        new go.Binding("text")
                    )
                ),
                // three named ports, one on each side except the bottom, all input only:
                makePort("T", go.Spot.Top, false, true),
                makePort("L", go.Spot.Left, false, true),
                makePort("R", go.Spot.Right, false, true)
            )
        );
    }

    function setOtherPalettes(palettes) {
        for (var key in palettes) {
            window.laraflowGo.nodeTemplateMap.add(palettes[key].name,
                GO(go.Node, "Spot", nodeStyle(),
                    GO(go.Panel, "Auto",
                        GO(go.Shape, "RoundedRectangle", {
                                fill: palettes[key].color,
                                stroke: palettes[key].color,
                                strokeWidth: 5,
                                parameter1: 4
                            },
                            new go.Binding("figure", "figure")),
                        GO(go.TextBlock, "Start", {
                                font: "bold 11pt Helvetica, Arial, sans-serif",
                                stroke: lightText
                            },
                            new go.Binding("text")
                        )
                    ),

                    // four named ports, one on each side:
                    makePort("T", go.Spot.Top, false, true),
                    makePort("L", go.Spot.Left, true, true),
                    makePort("R", go.Spot.Right, true, true),
                    makePort("B", go.Spot.Bottom, true, false)
                )
            );
        }
    }

    function linkTemplate() {
        window.laraflowGo.linkTemplate =
            GO(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: true,
                    relinkableTo: true,
                    reshapable: true,
                    resegmentable: true,
                    // mouse-overs subtly highlight links:
                    mouseEnter: function (e, link) {
                        link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                    },
                    mouseLeave: function (e, link) {
                        link.findObject("HIGHLIGHT").stroke = "transparent";
                    }
                },
                new go.Binding("points").makeTwoWay(),
                GO(go.Shape, {
                    isPanelMain: true,
                    strokeWidth: 8,
                    stroke: "transparent",
                    name: "HIGHLIGHT"
                }),
                GO(go.Shape, {
                    isPanelMain: true,
                    stroke: "gray",
                    strokeWidth: 2
                }),
                GO(go.Shape, {
                    toArrow: "standard",
                    stroke: null,
                    fill: "gray"
                }),
                GO(go.Panel, "Auto", {
                        visible: true,
                        name: "LABEL",
                        segmentIndex: 2,
                        segmentFraction: 0.5
                    },
                    new go.Binding("visible", "visible").makeTwoWay(),
                    GO(go.Shape, "Rectangle", {
                        fill: "#F8F8F8",
                        stroke: null
                    }),
                    GO(go.TextBlock, "", {
                            textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: "#333333",
                            editable: true,
                            visible: true
                        },
                        new go.Binding("text").makeTwoWay()
                    )
                )
            );
    }
}
