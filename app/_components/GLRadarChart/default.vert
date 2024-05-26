#version 300 es

#define PI radians(180.)

uniform int vertexCount;
uniform int dashCount;
uniform float weights[20];
uniform int type;
uniform float rotation;
uniform float breathe;

uniform vec4 backgroundColor;
uniform vec4 dataColor;
uniform vec4 lineColor;
uniform vec4 outlineColor;
uniform vec4 dataOutlineColor;

out float v_type;
out vec4 v_backgroundColor;
out vec4 v_dataColor;
out vec4 v_lineColor;
out vec4 v_outlineColor;
out vec4 v_dataOutlineColor;

vec2 ori=vec2(0,0);

vec2 rotate(vec2 v,float angle){
  return vec2(v.x*cos(angle)-v.y*sin(angle),v.x*sin(angle)+v.y*cos(angle));
}

vec2 breatheEffect(vec2 v){
  float scale=1.+sin(breathe)*.2;
  return v*scale;
}

vec2 getPolygonVertexById(int id){
  float angle=PI*2./float(vertexCount);
  return vec2(sin(angle*float(id)),cos(angle*float(id)))*weights[id%vertexCount];
}

vec2 createPolygon(int id){
  int triangleId=id/3;
  int vertexId=id%3;
  if(vertexId==0){
    return ori;
  }
  return getPolygonVertexById(triangleId+vertexId);
}

vec2 createLine(int id){
  float width=.01;
  int vertexId=id%4;
  int lineId=id/4;
  
  vec2 vertex=getPolygonVertexById(lineId+1);
  vec2 direction=normalize(ori-vertex);
  vec2 perpendicular=vec2(-direction.y,direction.x);
  vec2 offset=perpendicular*width;
  
  if(vertexId==0){
    return ori+offset;
  }else if(vertexId==1){
    return ori-offset;
  }else if(vertexId==2){
    return vertex+offset;
  }else{
    return vertex-offset;
  }
}

vec2 createDashedLine(int id){
  float width=.01;
  int vertexId=id%(6*dashCount);
  int lineId=id/(6*dashCount);
  
  vec2 vertex=getPolygonVertexById(lineId+1);
  vec2 direction=normalize(ori-vertex);
  vec2 perpendicular=vec2(-direction.y,direction.x);
  vec2 offset=perpendicular*width;
  
  float totalLength=length(ori-vertex);
  float dashLength=totalLength/float(dashCount*2-1);
  int dashVertexId=id%6;
  int dashId=(id%(6*dashCount))/6;
  
  vec2 thisDashVertex=direction*dashLength*float(dashId*2);
  vec2 nextDashVertex=direction*dashLength*float(dashId*2+1);
  
  if(dashVertexId==0){
    return thisDashVertex+offset;
  }else if(dashVertexId==1){
    return thisDashVertex-offset;
  }else if(dashVertexId==2){
    return nextDashVertex+offset;
  }else if(dashVertexId==3){
    return thisDashVertex-offset;
  }else if(dashVertexId==4){
    return nextDashVertex+offset;
  }else{
    return nextDashVertex-offset;
  }
}

vec2 createOutline(int id){
  float width=.01;
  int vertexId=id%4;
  int lineId=id/4;
  
  vec2 vertex=getPolygonVertexById(lineId+1);
  vec2 nextVertex=getPolygonVertexById(lineId+2);
  vec2 direction=normalize(vertex-nextVertex);
  vec2 perpendicular=vec2(-direction.y,direction.x);
  vec2 offset=perpendicular*width;
  
  if(vertexId==0){
    return vertex+offset;
  }else if(vertexId==1){
    return vertex-offset;
  }else if(vertexId==2){
    return nextVertex+offset;
  }else{
    return nextVertex-offset;
  }
}

void main(){
  v_type=float(type);
  v_backgroundColor=backgroundColor;
  v_dataColor=dataColor;
  v_lineColor=lineColor;
  v_outlineColor=outlineColor;
  v_dataOutlineColor=dataOutlineColor;
  if(type==0){
    // for background and data polygon
    gl_Position=vec4(createPolygon(gl_VertexID),0,1);
    return;
  }else if(type==1){
    // for data polygon
    gl_Position=vec4(breatheEffect(rotate(createPolygon(gl_VertexID),rotation)),0,1);
    return;
  }else if(type==2){
    // for line
    gl_Position=vec4(createLine(gl_VertexID),0,1);
    return;
  }else if(type==3){
    // for outline
    gl_Position=vec4(createOutline(gl_VertexID),0,1);
    return;
  }else if(type==5){
    // for dataoutline
    gl_Position=vec4(breatheEffect(rotate(createOutline(gl_VertexID),rotation)),0,1);
    return;
  }else if(type==4){
    // for dashed line
    gl_Position=vec4(createDashedLine(gl_VertexID),0,1);
    return;
  }
}